import React, {Component} from "react";
import PhoneBookForm from "./PhoneBook/PBForm";
import List from "./PhoneBook/PBList";
import PBSearch from "./PhoneBook/PBSearch";
import Section from "./Section/Section";
import { ContentContainer, PageContainer } from "./styled-comp/styled";


class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter:'',
  }
 
  renderContacts = (newContact) => {
    this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact]
        }))
    setTimeout(() => console.log(this.state.contacts), 500 )
  }

  handleChangeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value })
  }

  onFilter = () => {
    if (this.state.filter) {
      const filterredArray = this.state.contacts.filter(({ name }) => name.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1)
      return filterredArray
    } 
    return this.state.contacts
  }

  isExist = (item) => {
    this.state.contacts.forEach(cont => {
      if (cont.name === item.name) {
        return alert("Please enter new contact")  
      }
    } )
  }

  onDelete = (id) => {
    const toUpdate = this.state.contacts.filter(elem => elem.id !== id)
    this.setState({contacts: toUpdate})
  }

  render() {
    const array = this.onFilter()
    return (
    <PageContainer>
      <ContentContainer>
          <Section title="Phonebook">
            <PhoneBookForm pushC={this.renderContacts} isExist = {this.isExist} />
          </Section>
          <Section title="Contacts">
            <PBSearch onChange = {this.handleChangeFilter}/>
            <List array={array} onDelete = {this.onDelete} />
          </Section>
        </ContentContainer>
      </PageContainer>
  );
  }
}

export default App;
