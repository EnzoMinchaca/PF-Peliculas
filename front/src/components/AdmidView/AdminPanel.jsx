import React from "react";
import Header from '../Presentational/header'
import Footer from '../Presentational/footer'
import ButtonHome from '../Presentational/ButtonHome'
import styles from "../../styles/styles.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Style from "./AdminPanel.module.css"


export default function AdminPanel() {
    return (
        <div>
            <Header/>
            <div className={styles.title}>
                <p className={styles.span}> Admin Panel</p>
            </div>
                <div><ButtonHome/></div>
            <div>
                <br />  <br />
                <table class="table table-hover">
                    <thead className="table-succes">
                        <th>
                            <select>
                                <option value="Default">By Role</option>
                                <option>Admin</option>
                                <option>User</option>
                            </select>
                        </th>
                        <th>
                            <input placeholder="Search" className={Style.input}>
                            {/*     <span className={Style.highlight}></span>
                                <span className={Style.bar}></span> */}
                            </input>
                        </th>
                    </thead>
                </table>
            </div>
            <table class="table table-hover">
                <thead className="table-info">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Id</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>425</td>
                        <td>Owner</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>564845</td>
                        <td>
                            <select>
                                <option>Admin</option>
                                <option>User</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>546845</td>
                        <td>
                            <select>
                                <option>Admin</option>
                                <option>User</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Larry</td>
                        <td>546845</td>
                        <td>
                            <select>
                                <option>Admin</option>
                                <option>User</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Larry</td>
                        <td>546845</td>
                        <td>
                            <select>
                                <option>Admin</option>
                                <option>User</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Footer/>
        </div>
    )
}