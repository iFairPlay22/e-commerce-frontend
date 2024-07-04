export type HeaderComponentProps = {
    links: {
        title: string,
        link: string
    }[]
}

export const HeaderComponent = ({ links }: HeaderComponentProps) => (
    <header>
        <div 
            style={{ 
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center'
            }}
        >
            {links.map(({ title, link}) => (
                <button 
                    key={title} 
                    onClick={() => location.href = link}
                    style={{
                        margin: '5px'
                    }}
                >
                    { title }
                </button>
            ))}
        </div>
    </header>
)