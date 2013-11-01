<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/1/13
 * Time: 1:00 PM
 */

namespace UserManagement;

/**
 * Class ContactBusiness
 * @package UserManagement
 */
class ContactBusiness
{

    /**
     * @param integer $id
     * @return \UserManagement\Contact
     */
    public static function findContact($id)
    {
        return Contact::find($id);
    }

    public static function getContactsOf(\User $user)
    {
        $em = \Model::getEntityManager();

        $qb = $em->createQueryBuilder();

        $qb       ->select("c")->from('\UserManagement\Contact', 'c')->
            where('c.user_a = :user OR c.user_b = :user')
                  ->setParameter("user", $user);

        $result = $qb->getQuery()->getResult();

        return $result;
    }

    public static function addOrCreate($data)
    {
        $usera = \User::find($data["user_a"]["id"]);
        $userb = \User::find($data["user_b"]["id"]);
        if (isset($data["id"]))
        {
            $contact = Contact::find($data["id"]);
        }
        else
        {
            $em = \Model::getEntityManager();
            $qb = $em->createQueryBuilder();

            $qb->select("c")->from('\UserManagement\Contact', 'c')
               ->where('(c.user_a = :usera AND c.user_b = :userb)')
               ->orWhere('(c.user_b = :usera AND c.user_b = :usera)')
               ->setParameter('usera', $usera)->setParameter('userb', $userb);
            $result = $qb->getQuery()->getResult();

            if (isset($result[0]))
            {
                $contact = $result[0];
            }
        }

        if (!isset($contact))
        {
            $contact = new Contact;
            $contact->setUserA($usera);
            $contact->setUserB($userb);
        }

        $contact->save();

        return $contact;
    }

    public static function deleteContact(Contact $contact)
    {
        $contact->delete();

        if (!is_object($contact))
        {
            return true;

        }
        else
        {
            return false;

        }

    }
}