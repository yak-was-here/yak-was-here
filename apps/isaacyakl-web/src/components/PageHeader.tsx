const PageHeader = ({ heading = "isaacyakl.com", className = "" }) => {
    return (
        <header className={className}>
            <div className={`max-width m-auto p-2`}>
                <h1>{heading}</h1>
                <hr className="m-0" />
            </div>
        </header>
    );
};

export default PageHeader;
