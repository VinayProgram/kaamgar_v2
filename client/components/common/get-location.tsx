import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Locate } from 'lucide-react'

const GetLocation = ({ cb, ref }: { cb: (lat: number, lng: number) => void, ref?: React.RefObject<HTMLButtonElement | null> }) => {
    return (
        <Button
            type="button"
            variant="secondary"
            size="sm"
            ref={ref}
            className="bg-white dark:bg-slate-900 shadow-sm"
            onClick={() => {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        cb(position.coords.latitude, position.coords.longitude);
                    });
                }
            }}
        >
            <Locate className="h-4 w-4 mr-2 text-indigo-600" /> Get GPS
        </Button>
    )
}

export const useGetLocationHook = ({ updationData }: { updationData?: any }) => {
    const [location, setLocation] = useState<{ lat: number, lng: number }>({
        lat: 18.5204,
        lng: 73.8567
    })
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
            });
        } else {
            setLocation({ lat: 18.5204, lng: 73.8567 });
        }
    }, [updationData])
    return location;
}
export default GetLocation