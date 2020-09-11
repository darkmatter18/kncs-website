import React, {useContext} from "react";
import settingsApi from "./api";
import PropTypes from "prop-types";

const AppSettingsContext = React.createContext(null)

const AppSettingsProvider = ({children}) => {
    const [appSettings, setAppSettings] = React.useState(null)

    React.useEffect(()=>{
        const networkRequest = async () => {
            try {
                const res = await settingsApi()
                if (res.status === 200) {
                    setAppSettings(res.data.data)
                }
            } catch (e) {
                if(window.confirm("Failed to connect to the server. Please reload:")){
                    window.location.reload()
                }
            }
        }
        networkRequest()
    }, [])
    return (
       <React.Fragment>
           <AppSettingsContext.Provider value={appSettings} >
               {children}
           </AppSettingsContext.Provider>
       </React.Fragment>
    )
}

AppSettingsProvider.propTypes = {
    children: PropTypes.node.isRequired
}

const useAppSettings = () => {
    const c = useContext(AppSettingsContext)
    return () => {
        return c
    }
}

export {useAppSettings, AppSettingsProvider}