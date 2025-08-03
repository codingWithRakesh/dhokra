import React, { createContext, useContext, useState } from 'react'

export const VideoContext = createContext()

const VideoContextProvider = ({ children }) => {
    const [videoControl, setVideoControl] = useState(false)
    return (
        <VideoContext.Provider value={[videoControl, setVideoControl]}>
            {children}
        </VideoContext.Provider>
    )
}
export default VideoContextProvider

export function useVideo() {
    return useContext(VideoContext)
} 