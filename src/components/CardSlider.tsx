import React, { FC, useEffect } from 'react'; 
import "@splidejs/splide/dist/css/splide.min.css";
import Splide from '@splidejs/splide';
import '../stylesheets/CardSlider.css'; 

const CardSlider: FC = () => {
    useEffect(() => {
        new Splide('.splide', {
          type: 'loop',
          perPage: 3,
          focus: 'center',
        }).mount();
      }, []);
    
      const cardData = [
        { title: "NFT Launchpads", imagePath: "./launchpad .png" },
        { title: "Airdrops", imagePath: "./airdrop.png" },
        { title: "Proof of Community", imagePath: "./community.png" },
        { title: "Gaming / Gambling", imagePath: "./gaming.png" },
        { title: "Permissioned DeFi", imagePath: "./permissioned.png" },
    ];
    
    return (
        <div className="splide">
            <div className="splide__track">
                <ul className="splide__list">
                    {cardData.map((card, index) => (
                        <li className="splide__slide" key={index}>
                            <img src={card.imagePath} alt={card.title} className="card-image" />
                            <h3>{card.title}</h3>
                            <p>Description for {card.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CardSlider;