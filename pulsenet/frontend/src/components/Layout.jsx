import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
    return (
        <div className="app-layout">

            {/* SIDEBAR FIXA */}
            <Sidebar />

            {/* CONTEÚDO CENTRAL */}
            <main className="main-content">

                <div className="content-wrapper">
                    <Outlet />
                </div>

            </main>

        </div>
    )
}