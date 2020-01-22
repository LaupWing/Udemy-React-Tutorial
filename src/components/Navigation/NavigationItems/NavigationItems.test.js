import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavItems from './NavigationItems'
import NavItem from './NavigationItem/NavigationItem'
import React from 'react'

configure({adapter: new Adapter()})

describe('<NavigationItems/>',()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = shallow(<NavItems/>)
    })
    it('should render two <NavigationItem/> elements when not auth',()=>{
        expect(wrapper.find(NavItem)).toHaveLength(2)
    })
    it('should render three <NavigationItem/> elements when auth',()=>{
        // wrapper = shallow(<NavItems isAuth/>)
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavItem)).toHaveLength(3)
    })
    it('should render Logout when auth',()=>{
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(true)
    })
} )