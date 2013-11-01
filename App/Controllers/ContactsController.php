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

    }

    public function update()
    {

    }

    public function delete()
    {

    }
} 