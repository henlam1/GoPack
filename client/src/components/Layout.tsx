import React from "react"

type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
    return(
        <div className="mt-12">
            <header>
            {/* Header content goes here */}
            </header>
            <main>
            {props.children}
            </main>
            <footer>
            {/* Footer content goes here */}
            </footer>
        </div>
    )
}