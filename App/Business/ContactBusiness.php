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

    /**
     * @param \User $user
     * @return array
     */
    public static function getContactsOf(\User $user)
    {
        $em = \Model::getEntityManager();

        $qb = $em->createQueryBuilder();

        $qb->select("c")->from('\UserManagement\Contact', 'c')->
            where('c.user_a = :user OR c.user_b = :user')
                  ->setParameter("user", $user);

        $result = $qb->getQuery()->getResult();

        return $result;
    }

    /**
     * @param array $data
     * @return \UserManagement\Contact
     * @throws UnauthorizedException
     */
    public static function addOrCreate($data)
    {
        $usera = \User::find($data["user_a"]["id"]);
        $userb = \User::find($data["user_b"]["id"]);

        if ($usera != \User::current_user() && $userb != \User::current_user() && !\User::current_user()->isAdmin())
        {
            throw new UnauthorizedException("Unauthorized action");
        }
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

        if (isset($data["pending"]))
            $contact->setPending($data["pending"]);

        $contact->save();

        return $contact;
    }

    /**
     * @param Contact $contact
     * @return bool
     * @throws UnauthorizedException
     */
    public static function deleteContact(Contact $contact)
    {

        $usera = $contact->getUserA();
        $userb = $contact->getUserB();
        if ($usera != \User::current_user() && $userb != \User::current_user() && !\User::current_user()->isAdmin())
        {
            throw new UnauthorizedException("Unauthorized action");
        }

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