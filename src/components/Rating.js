import React, { useState } from 'react';
import styled from 'styled-components';


const Rating = ({onGivingRating}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isClickable, setIsClickable] = useState(true);

  const handleStarHover = (index) => {
    if (isClickable) {
      setHoveredRating(index);
    }
  };

  const handleStarClick = (index) => {
    if (isClickable) {
      setRating(index);
      setIsClickable(false);
      onGivingRating(index);
    }

  };

  const handleReset = () => {
    setRating(0);
    setIsClickable(true);
  }

  return (
    <RatingContainer>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
        <StarIcon
          key={index}
          active={index <= rating}
          hovered={index <= hoveredRating}
          isClickable={isClickable}
          onMouseEnter={() => handleStarHover(index)}
          onClick={() => handleStarClick(index)}
        >
          ★
        </StarIcon>
      ))}
      <Star> {rating} ★</Star>
      <button onClick={handleReset}>Reset </button>

    </RatingContainer>
  );
};

export default Rating;


const RatingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 10px 80px;
  button{
    padding:5px 12px;
    color:white;
    background-color:#2b00ac;
    border-radius: 10rem;
    cursor:pointer;
  }
`;

const StarIcon = styled.span`
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
  font-size: 16px;
  color: ${(props) => (props.active || props.hovered) ? '#FFD700' : 'black'};
`;

const Star = styled.span`
padding:0px 10px;
`