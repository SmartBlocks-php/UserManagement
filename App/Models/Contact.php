<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/1/13
 * Time: 12:29 PM
 */

namespace UserManagement;

use ReflectionClass;

/**
 * @Entity @Table(name="user_management_contact")
 */
class Contact extends \Model
{
    /**
     * @Id @GeneratedValue(strategy="AUTO") @Column(type="integer")
     */
    public $id;

    /**
     * @ManyToOne(targetEntity="\User")
     * @var \User $user_a
     */
    private $user_a;

    /**
     * @ManyToOne(targetEntity="\User")
     * @var \User $user_b
     */
    private $user_b;

    /**
     * @Column(type="boolean")
     * @var boolean $pending
     */
    private $pending;

    public function __construct()
    {
        $this->pending = true;
    }

    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param \User $user_a
     */
    public function setUserA($user_a)
    {
        $this->user_a = $user_a;
    }

    /**
     * @return \User
     */
    public function getUserA()
    {
        return $this->user_a;
    }

    /**
     * @param \User $user_b
     */
    public function setUserB($user_b)
    {
        $this->user_b = $user_b;
    }

    /**
     * @return \User
     */
    public function getUserB()
    {
        return $this->user_b;
    }

    /**
     * @param boolean $pending
     */
    public function setPending($pending)
    {
        $this->pending = $pending;
    }

    /**
     * @return boolean
     */
    public function getPending()
    {
        return $this->pending;
    }

    function save()
    {
        parent::save();
        \NodeDiplomat::sendMessage($this->user_a->getSessionId(), array(
            "block" => "UserManagement",
            "message" => "contact_saved",
            "contact" => $this->toArray()
        ));

        \NodeDiplomat::sendMessage($this->user_b->getSessionId(), array(
            "block" => "UserManagement",
            "message" => "contact_saved",
            "contact" => $this->toArray()
        ));
    }

    function delete()
    {
        \NodeDiplomat::sendMessage($this->user_a->getSessionId(), array(
            "block" => "UserManagement",
            "message" => "contact_deleted",
            "contact" => $this->toArray()
        ));

        \NodeDiplomat::sendMessage($this->user_b->getSessionId(), array(
            "block" => "UserManagement",
            "message" => "contact_deleted",
            "contact" => $this->toArray()
        ));
        parent::delete();
    }


    public function toArray()
    {
        $array = array(
            "id" => $this->id,
            "user_a" => $this->user_a->toArray(),
            "user_b" => $this->user_b->toArray(),
            "pending" => $this->pending
        );
        return $array;
    }

}