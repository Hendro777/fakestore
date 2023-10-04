import { useContext } from "react"
import { useOutlet, useOutletContext } from "react-router-dom"

export default function AccountDashboard() {
    const user = useOutletContext()
    const userInfoArr = [user.firstName, user.lastName, user.email]

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
                </div>
            </div>
        </section>
    )
}