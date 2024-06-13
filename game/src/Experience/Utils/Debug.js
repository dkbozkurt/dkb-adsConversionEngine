import * as dat from 'lil-gui'

export default class Debug
{
    constructor()
    {
        // ! To enable debug mode by adding /#debug at the end of URL. And refresh the page.
        this.active = window.location.hash === '#debug'
        // console.log("Debug mode is+" + this.active)

        if(this.active)
        {
            this.ui = new dat.GUI()
        }
    }
}