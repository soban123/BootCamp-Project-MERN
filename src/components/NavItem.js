import React from 'react'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './../sidenav.css'
import { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
const SidebarItem = ({ title, eventKey, icon, color }) => {
    console.log({ title, eventKey, icon, color });
    return (
        <NavItem eventKey='input' className="Navitems"  >
            <NavIcon>
                <i className={"fa fa-fw " + icon} />
            </NavIcon>
            <NavText style={{ color }} >
                {title}
            </NavText >
        </NavItem>
    )
}

export { SidebarItem }