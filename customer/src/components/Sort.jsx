import React from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";


const Sort = ({ handleSortChange }) => {

    const onSortChange = (e) => {
        const selectedSortOption = e.target.value;
        handleSortChange(selectedSortOption);
        console.log(selectedSortOption)
      };

  return (
    <Wrapper className="sort-section">
      
      {/* 3rd column  */}
      <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            onChange={onSortChange}
            >
            <option value="lowest">Price (lowest)</option>
            <option value="#" disabled></option>
            <option value="highest">Price (highest)</option>
            <option value="#" disabled></option>
            <option value="a-z">without sort</option>
            <option value="#" disabled></option>
            
          </select>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
    
  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      font-size: 1.6rem;
    }
    
  }
  .sort-selection--style{
    width:140%;
  }
  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;
   
  }
  
`;

export default Sort;