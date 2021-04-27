import CircularProgress from '@material-ui/core/CircularProgress';
const Loading = () => {
    return (
        <center>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <img
                    src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-icone.png"
                    alt=""
                    style={{ marginBottom: 10 }}
                    height={200}
                />
                <CircularProgress />
            </div>
        </center>
    )
}

export default Loading
