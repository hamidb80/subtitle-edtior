import React, { MouseEvent } from 'react'
import { second2timestamp } from "../../utils/timestamp"

import '../../styles/components/simple-timeline.sass'
import { isThisTypeNode } from 'typescript'

type Props = {
    className?: string
    
    totalTime: number // per seconds
    currentTime: number
    onSelectNewTime?: (newTime: number) => void
    
    fullScreen?: boolean
}

class SimpleTimeline extends React.Component<Props> {
    constructor(props: any) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e: MouseEvent<HTMLDivElement>) {
        const handler = this.props.onSelectNewTime

        if (handler) {
            const element = e.currentTarget
                , xUserClicked = e.pageX
                , xFirstOfProgressBar = element.offsetLeft
                , width = element.clientWidth
                , videoDuration = this.props.totalTime

            const newTime = ((xUserClicked - xFirstOfProgressBar) / width) * videoDuration

            handler(newTime)
        }
    }

    render() {
        if (this.props.totalTime === undefined)
            return ''


        const widthPercent = this.props.currentTime / this.props.totalTime * 100
        const time = second2timestamp(this.props.currentTime, "minute")
        const duration = second2timestamp(this.props.totalTime, "minute")

        return (
            <div className={"timeline "+ this.props.className  + (this.props.fullScreen ? ' fullscreen' : '')}
                onClick={this.handleClick}>
                <div className="progress">
                    <div className="progress-bar" style={{ width: `${widthPercent}%` }}></div>
                    <div className="cursor"></div>
                </div>
                <div className="time-text-wrapper">
                    <div className="time-text">
                        <span> {time} </span>
                        <span> - </span>
                        <span> {duration} </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default SimpleTimeline