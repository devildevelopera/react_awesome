import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const Table = styled.table `
  width: 100%;
  border-collapse: collapse;

  thead > tr > th {
    font-weight: normal;
    font-size: 12px;
    color: #888;
    text-align: left;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  tbody > tr > td {
    padding: 10px 4px;
    border-bottom: 1px solid #ddd;
  }
`;
const Image = styled.div `
  background-image: url(${props => props.img});
  width: 125px;
  height: 125px;
  background-size: cover;
  background-position: 50%;
  @media (max-width: 650px) {
    width: 62px;
    height: 62px;
  }
`;
const Remove = styled.span `
  cursor: pointer;
  opacity: .5;
  transition: opacity .5s;
  &:hover { opacity: 1; }
`;

const CartTable = ({ items, updateCount, removeItem }) => (
  <Table>
    <thead>
      <tr>
        <th>Image</th>
        <th>Title</th>
        <th>Quantity</th>
        <th>Total</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      { items.map((d,i) => {
        return (<tr key={`cart${i}`}>
          <td>
              <Image img={d.img} />
          </td>
          <td>
              {d.name}
          </td>
          <td>
            <TextField
              value={d.quantity}
              onChange={(e) => {
                if (e.target.value < 0) e.target.value = 0;
                updateCount(i, e.target.value)
              }}
              type="number"
              margin="none"
              style={{ width: "40px" }}
            />
          </td>
          <td>
            ${(d.quantity*d.price).toFixed(2)}
          </td>
          <td>
            <Remove onClick={() => removeItem(i)}>✕</Remove>
          </td>
        </tr>);
      })}
    </tbody>
  </Table>
);

export default withTheme(CartTable);