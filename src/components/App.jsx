import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import css from '../components/App.module.css';
import { useState, useEffect } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';

const LOCAL_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts]= useLocalStorage(LOCAL_KEY, [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter]= useState('');

  useEffect(()=> {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);


  const handleAddContact =  contact => {
    const sameContact = contacts.find(el => el.name === contact.name);
    if (sameContact) {
      alert(`${ contact.name} is already in contacts`);
    } else {
      const newContact = {...contact, id: nanoid()};
      setContacts((prevState) => ([...prevState, newContact]));
    }
  };

  const changeFilter = e => {
    const { value } = e.currentTarget;
    console.log(value);
    setFilter(value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const removeContact = contactId => {
    setContacts(prev => (prev.filter(({ id }) => id !== contactId))
      
    );
  };

    return (
      <div>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm handleAddContact={handleAddContact} />

        <h2 className={css.subTitle}>Contacts</h2>
        <Filter value={filter} onChangeFilter={changeFilter} />
        <ContactList
          contacts={getFilteredContacts()}
          onRemoveContact={removeContact}
        />
      </div>
    );
  
}
