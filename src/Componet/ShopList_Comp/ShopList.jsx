import React, { useState } from 'react';
import './ShopList.css';
import { AiFillFire, AiFillThunderbolt } from "react-icons/ai";

const Shop = ({ shop }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleBranchClick = (branchIndex) => {
        alert(`Shop: ${shop.name}, Branch: ${shop.branches[branchIndex]}, Index: ${branchIndex}`);
    };

    return (
        <div className="shop">
            <div className="shop-name" style={{ color: '#B3261E' }} onClick={handleToggle}>
                {shop.name}
                <span className={`arrow ${isOpen ? 'open' : ''}`}>
                    <AiFillFire style={{ color: '#B3261E' }} />
                </span>
            </div>
            {isOpen && (
                <div className="branches">
                    {shop.branches.map((branch, index) => (
                        <div
                            key={index}
                            className="branch-card"
                            onClick={() => handleBranchClick(index)}
                        >
                            <div className="branch-icon">
                                <div><span ><AiFillThunderbolt style={{ color: '#B3261E' }} /></span></div>
                                <div>{branch}</div>
                            </div>


                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ShopList = ({ shops }) => {
    return (
        <div className="shop-list">
            {shops.map((shop, index) => (
                <Shop key={index} shop={shop} />
            ))}
        </div>
    );
};

export default ShopList;
