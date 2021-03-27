import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Table from './table.component';

configure({adapter: new Adapter()});

const getUsers = async () => {
  return fetch(`https://randomuser.me/api/?page=1&results=5&id,picture,name,email,gender,dob,phone,location,nat&seed=coodesh`)
  .then(res => res.json())
  .then(data => data.results)
}

describe('testing tableComponent', () => {
  
  test('SortBy name - Ascending', async () => {
    expect.assertions(1);

    const mockProps = {
      data: await getUsers(),
      OnClick: () => console.log('test') 
    };
    const wrp = mount(< Table {...mockProps}/>);
    const header_name = wrp.find('#sortByName').hostNodes();

    header_name.simulate('click');

    const values = wrp.find('#nameData').map(node => node.text());
    const sorted = [...values].sort();

    expect(values).toEqual(sorted)

    wrp.unmount();
  })

  test('SortBy name - Descending', async () => {
    expect.assertions(1);

    const mockProps = {
      data: await getUsers(),
      OnClick: () => console.log('test') 
    };
    const wrp = mount(< Table {...mockProps}/>);
    const header_name = wrp.find('#sortByName').hostNodes();

    header_name.simulate('click');
    header_name.simulate('click');

    const values = wrp.find('#nameData').map(node => node.text());
    const sorted = [...values].sort().reverse();

    expect(values).toEqual(sorted) 

    wrp.unmount();
  })

  test('SortBy gender - Female', async () => {
    expect.assertions(2);  

    const mockProps = {
      data: await getUsers(),
      OnClick: () => console.log('test') 
    }
    const wrp = mount(< Table {...mockProps}/>);
    const header_gender = wrp.find('#filterByGender').hostNodes();

    header_gender.simulate('click');

    const values = wrp.find('#genderData').map(node => node.text());
    expect(values.some(v => v === 'Male')).toBe(false);
    expect(values.every(v => v === 'Female')).toBe(true);
  
    wrp.unmount();
  });

  test('SortBy gender - Male', async () => {
    expect.assertions(2);  

    const mockProps = {
      data: await getUsers(),
      OnClick: () => console.log('test') 
    }
    const wrp = mount(< Table {...mockProps}/>);
    const header_gender = wrp.find('#filterByGender').hostNodes();

    header_gender.simulate('click');
    header_gender.simulate('click');

    const newValues = wrp.find('#genderData').map(node => node.text());
    expect(newValues.some(v => v === 'Male')).toBe(true);
    expect(newValues.every(v => v === 'Female')).toBe(false);

    wrp.unmount();
  });
})