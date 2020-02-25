import { Component } from 'react';
import "../index.scss"
import TopNav from './topNav';
import { ILink } from './localtypes';
import { sha256 } from 'js-sha256';

interface ILayoutsState {
    Links: ILink[]
}

export default class Layouts extends Component<{}, ILayoutsState> {
    private links = [
        { title: "Root", url: "/" },
        { title: "Home", url: "/home" },
    ];
    constructor(p) {
        super(p);
        this.state = {
            Links: []
        }
    }
    componentDidMount() {
        this.getLinks();
    }

    private async getLinks() {
        var localstoreLinks = JSON.parse(localStorage.getItem("TopNavContent")) as ILink[]
        if (localstoreLinks) {
            this.setState({ Links: localstoreLinks })
        }
        var res = await fetch("/TopNavContent.json");

        var liveLinks = await res.json() as ILink[];

        const shalivelink = sha256(JSON.stringify(liveLinks));
        const shalslink = sha256(JSON.stringify(localstoreLinks));

        if (shalivelink != shalslink) {
            console.log("hash don't macth... updating local storage");
            this.setState({ Links: liveLinks })
            localStorage.setItem("TopNavContent", JSON.stringify(liveLinks));
        }
    }

    public render() {
        return <div className={"layout"}>
            <TopNav {...this.state} />
            <div className={"container"}>
                {this.props.children}
            </div>
        </div>
    }
}
