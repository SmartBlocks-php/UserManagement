<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/1/13
 * Time: 12:29 PM
 */

namespace UserManagement;
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
     */
    private $user_a;

    /**
     * @ManyToOne(targetEntity="\User")
     */
    private $user_b;

    /**
     * @Column(type="boolean")
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

    public function toArray()
    {
        $array = array(
            "id" => $this->id,
            "user_a" => $this->user_a->toArray(),
            "user_b" => $this->user_b->toArray()
        );
        return $array;
    }

}