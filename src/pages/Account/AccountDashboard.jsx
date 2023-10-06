import { useContext } from "react"
import { useNavigate, useOutlet, useOutletContext } from "react-router-dom"
import { logoutUser } from "../../utils/auth"

export default function AccountDashboard() {
    const user = useOutletContext()
    const userInfoArr = [user.firstName, user.lastName, user.email]
    const navigate = useNavigate()

    function logout() {
        logoutUser()
        navigate('/')
    }

    const userInfoItems = userInfoArr.map((info, index) => {
        const key = Object.keys(user).find(key => user[key] === info)
        const label = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()

        return <label key={`userInfo-${index}`} className="userInfo-pair">
            {label}
            <span>{info}</span>
        </label>
    })

    return (
        <section className="dashboard">
            <h1 className="headline">Dashboard</h1>
            <div className="content">
                <div className="profile-picture">
                    <img src={user.image} /></div>
                <div className="userInfo">
                    {userInfoItems}
                    <button className="btn-primary logout" onClick={logout}>Logout</button>
                </div>
            </div> 
        </section>
    )
}