import React from 'react';
import { PropTypes } from 'prop-types';
import { ContactsItem } from './ContactItem';
import { ContactsList } from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const onDeleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  const visibleContacts = contacts
    .filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((first, second) => first.name.localeCompare(second.name));

  return (
    <>
      <ContactsList>
        {visibleContacts.map(({ id, name, number }, index) => (
          <ContactsItem
            key={id}
            index={index}
            name={name}
            number={number}
            onClick={() => onDeleteContact(id)}
          />
        ))}
      </ContactsList>
    </>
  );
};

ContactList.propTypes = {
  key: PropTypes.string,
};

export default ContactList;
