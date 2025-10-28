import { useState } from 'react';
import logo from '@/assets/icon-square-991.png';
import './App.css';

function App() {
    const [twitch, setTwitch] = useState(true);
    const [youtube, setYoutube] = useState(false);

    return (
        <>
            <div>
                <a href="https://isaacyakl.com" target="_blank">
                    <img src={logo} className="logo" alt="Ad Gagger logo" />
                </a>
            </div>
            <h1>Ad Gagger</h1>
            <div className="card">
                <p>Gag ads on the following websites:</p>
                <form>
                    <div>
                        <label>Twitch.tv</label>
                        <input
                            type="checkbox"
                            checked={twitch}
                            onClick={() => setTwitch(!twitch)}
                        />
                    </div>
                    <div>
                        <label>YouTube.com</label>
                        <input
                            type="checkbox"
                            checked={youtube}
                            onClick={() => setYoutube(!youtube)}
                            disabled
                        />
                    </div>
                </form>
            </div>
            <p className="read-the-docs">
                <a href="https://isaacyakl.com">Read the docs</a>
            </p>
        </>
    );
}

export default App;
