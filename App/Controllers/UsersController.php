<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 10/25/13
 * Time: 6:29 PM
 */

namespace UserManagement;

class UsersController extends \Controller
{
    public function index()
    {
        $users = User::all();


        $response = array();

        foreach ($users as $user)
        {
            $response[] = $user->toArray();
        }

        $this->return_json($response);
    }

    public function show()
    {
        $this->render = false;
    }

    public function create()
    {
        $data = $this->getRequestData();
        $user = \UserManagement\UsersBusiness::createOrUpdate($data);
        $this->return_json($user->toArray());
    }

    public function update($params = array())
    {
        $data = $this->getRequestData();
        $data["id"] = $params["id"];
        $user = \UserManagement\UsersBusiness::createOrUpdate($data);
        $this->return_json($user->toArray());
    }

    public function destroy()
    {

    }

    public function login()
    {
        $this->render = false;
        $data = $this->getRequestData();

        $email = $data["email"];
        $password = sha1($data["password"]);
        $results = User::where(array(
            "email" => $email,
            "password" => $password
        ));

        if (isset($results[0]))
        {
            $user = $results[0];
            $this->return_json(
                 array(
                     "result" => $user->login(),
                     "user" => User::current_user()->toArray()
                 )
            );
        }
        else
        {
            $this->json_error("Wrong username and/or password.");
        }
    }

    public function logout()
    {
        if (User::logged_in())
        {
            $this->return_json(
                 array(
                     "result" =>User::current_user()->logout()
                 )
            );
        }
        else
        {
            $this->json_error("Not logged in");
        }
    }
} 