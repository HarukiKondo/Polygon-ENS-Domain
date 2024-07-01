import React, { useEffect } from 'react';
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';

// 定数
const TWITTER_HANDLE = 'UNCHAIN_tech';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState('');

  // connectWallet 関数を定義
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask -> https://metamask.io/');
        return;
      }

      // アカウントへのアクセスを要求するメソッドを使用します。
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Metamask を一度認証すれば Connected とコンソールに表示されます。
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // ウォレットの接続を確認します。
  const checkIfWalletIsConnected = () => {
    // window.ethereumの設定。この表記法はJavascriptの「分割代入」を参照。
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have MetaMask!');
      return;
    } else {
      console.log('We have the ethereum object', ethereum);
    }
  };

  // まだウォレットに接続されていない場合のレンダリングです。
  const renderNotConnectedContainer = () => (
    <div className="connect-wallet-container">
      <img
        src="https://media.giphy.com/media/3ohhwytHcusSCXXOUg/giphy.gif"
        alt="Ninja gif"
      />
      <button className="cta-button connect-wallet-button">
        Connect Wallet
      </button>
    </div>
  );

  // ページがリロードされると呼び出されます。
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <header>
            <div className="left">
              <p className="title">🐱‍👤 Ninja Name Service</p>
              <p className="subtitle">Your immortal API on the blockchain!</p>
            </div>
          </header>
        </div>

        {/* currentAccount が存在しない場合、Connect Wallet ボタンを表示します*/}
        {!currentAccount && renderNotConnectedContainer()}

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >
            {`built with @${TWITTER_HANDLE}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;