<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 10/25/13
 * Time: 6:08 PM
 */

namespace UserManagement;


class User extends \Model
{
    public static $_elastic = true;

    private $id;

    private $username;

    private $email;

    private $firstname;

    private $lastname;

    private $data;

    private $password;

    private $admin;

    public $rights;

    public function __construct()
    {
        $this->data = array();
        $this->rights = array();
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $firstname
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;
    }

    /**
     * @return mixed
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $lastname
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;
    }

    /**
     * @return mixed
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * @param mixed $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param mixed $data
     */
    public function setData($data)
    {
        $this->data = $data;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param mixed $admin
     */
    public function setAdmin($admin)
    {
        $this->admin = $admin;
    }

    /**
     * @return mixed
     */
    public function getAdmin()
    {
        return $this->admin;
    }

    public function isValid()
    {
        if ($this->id != "")
        {
            $user = User::find($this->id);
            if ($user->password == $this->password)
                return true;
        }
        else
            return false;
    }

    public function isAdmin()
    {
        return $this->admin == true;
    }

    public function login()
    {
        if ($this->isValid())
        {
            $_SESSION["user_id"] = $this->id;
            $_SESSION["user_logged"] = true;
            return true;
        }
        else
        {
            return false;
        }
    }

    public function logout()
    {
        $_SESSION["user_id"] = 0;
        unset($_SESSION["user_id"]);
        $_SESSION["user_logged"] = false;
        return true;
    }

    public static function logged_in()
    {
        return isset($_SESSION["user_id"]) && isset($_SESSION["user_logged"]) && $_SESSION["user_logged"];
    }

    public static function is_admin()
    {
        $current_user = self::current_user();
        return ($current_user != null) && $current_user->isAdmin();
    }

    public static function current_user()
    {
        if (self::logged_in())
            return User::find($_SESSION["user_id"]);
        else
            return null;
    }

    public function toArray()
    {
        $array = array(
            "id" => $this->id,
            "username" => $this->username,
            "firstname" => $this->firstname,
            "lastname" => $this->lastname,
            "email" => $this->email,
            "admin" => $this->admin,
            "rights" => $this->rights
        );

        return $array;
    }

    /**
     * @param $required_right
     * @param bool $interface
     *
     * This function restricts data access in controllers.
     */
    public static function restrict($required_right = null, $interface = false)
    {
        $current_user = self::current_user();
        $continue = false;
        if (is_object($current_user))
        {
            foreach ($current_user->getRights() as $right)
            {
                if ($right->getToken() == $required_right || $required_right == null)
                {
                    $continue = true;
                }
            }
            if ($required_right == null)
            {
                $continue = true;
            }
        }

        if (!$continue)
        {
            if ($interface)
            {
                \Router::redirect("/Users/login_form");
            }
            else
            {
                \Router::redirect("/Users/unauthorized");
            }

        }
    }

    public function hasRight($right_token)
    {
        $hasright = false;
        foreach ($this->rights as $right)
        {
            if ($right->getToken() == $right_token)
            {
                $hasright = true;
            }
        }
        return $hasright || $right_token == "user";
    }

    /**
     * @param array $rights
     */
    public function setRights($rights)
    {
        $this->rights = $rights;
    }

    /**
     * @return array
     */
    public function getRights()
    {
        return $this->rights;
    }

} 