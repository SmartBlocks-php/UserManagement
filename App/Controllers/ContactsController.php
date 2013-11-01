<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/1/13
 * Time: 12:59 PM
 */

namespace UserManagement;

class ContactsController extends \Controller
{
    public function index()
    {
        $contacts = ContactBusiness::getContactsOf(\User::current_user());

        $response = array();

        foreach ($contacts as $contact)
        {
            $response[] = $contact->toArray();
        }

        $this->return_json($response);
    }

    public function create()
    {
        $data = $this->getRequestData();
        try
        {
            $contact = ContactBusiness::addOrCreate($data);
            $this->return_json($contact->toArray());
        } catch (\UserManagement\UnauthorizedException $e)
        {
            $this->json_error("The contact could not be created");
        }

    }

    public function update($params = array())
    {
        $data = $this->getRequestData();
        if (isset($params['id']))
            $data['id'] = $params['id'];
        $data = $this->getRequestData();
        try
        {
            $contact = ContactBusiness::addOrCreate($data);
            $this->return_json($contact->toArray());
        } catch (\UserManagement\UnauthorizedException $e)
        {
            $this->json_error("The contact could not be updated");
        }
    }

    public function destroy($params = array())
    {
        $data = $this->getRequestData();
        $id = isset($data["id"]) ? $data["id"] : $params["id"];
        try
        {
            $contact = ContactBusiness::findContact($id);
            if (ContactBusiness::deleteContact($contact))
            {
                $this->json_message("Successfully removed contact");
            }
            else
            {
                $this->json_error("Could not remove contact");
            }
        } catch (\UserManagement\UnauthorizedException $e)
        {
            $this->json_error("The contact could not be deleted");
        }
    }
} 