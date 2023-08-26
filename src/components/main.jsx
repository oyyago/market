import { Produtos } from './produtos/produtos'
import './styles/style.css'

export function Main() {


    return (
        <div className="body">
            <div className="left_col">
                <div className="main_menu">
                    <h3>General</h3>
                    <ul className="side-menu">
                        <li>
                            <ul className="child_menu">
                                <li><a href="index.html">Dashboard</a></li>
                                <li><a href="index2.html">Dashboard2</a></li>
                                <li><a href="index3.html">Dashboard3</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="top_nav">
                <div className="nav_menu">
                    <div className="toggle">
                        teste
            
            
                    </div>
                </div>
            </div>
            <div className="right_col" role="main">
                <Produtos />
            </div>
        </div>
    );
}