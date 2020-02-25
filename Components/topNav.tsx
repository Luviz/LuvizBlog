import {Component, Props} from "react";
import Link from "next/link";
import windows from "next/"
import { ILink } from "./localtypes";
// import Router from "next/router"

interface ITopNavProps {
    Links: ILink[]
}

interface ITopNavState {
    currLoc: string;
}



export default class TopNav extends Component <ITopNavProps, ITopNavState>{
    constructor(props: any) {
        super(props)
        this.state= {
            currLoc: undefined
        }
    }

    componentDidMount(){
        if (window.location){
            this.setState({currLoc: new URL(window.location.href).pathname});
        }
    }

    render(){
        var links = [];
        // const route = Router.route;
        for (const l of this.props.Links) {
            links.push(<Link href={l.url}><a className={this.getActive(l.url)} >{l.title}</a></Link>)
        }
        return <div className="topNav">
            {links}
        </div>
    }

    private getActive(url:string){
      if (this.state.currLoc){
        return this.state.currLoc == url ? "active": "";
      }  
      return'';
    }
}