import React, { Component } from 'react';
import { observer } from 'mobx-react';

export default observer(class Report extends Component {
    render() {
        return (
            <div>
                <p className="member-body-title">REPORT</p>
                <div className={"article-div"}>
                    <div className="article-name">Netanyahu</div>
                    <div className="article-complete">
                        <p>Percentage Complete</p>
                        <p>40%</p>
                    </div>
                    <div className="article-question">
                        <p>Question Accuracy</p>
                        <p>84%</p>
                    </div>
                    <div className="article-totaltime">
                        <p>Total Time</p>
                        <p>45 minutes 49 seconds</p>
                    </div>
                </div>
            </div>
        )
    }
});