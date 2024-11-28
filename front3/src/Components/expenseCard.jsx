import React from 'react';
import { Typography } from '@mui/material';
import MoneyOffIcon from '@mui/icons-material/MoneyOff'; // Icon for expenses
import DateRangeIcon from '@mui/icons-material/DateRange'; // Icon for dates
import CategoryIcon from '@mui/icons-material/Category'; // Icon for categories
import DeleteIcon from '@mui/icons-material/Delete'; // Icon for delete
import styled from 'styled-components';

// installed styled-components for this
const CardContainer = styled.div`
    position: relative;
    background: linear-gradient(135deg, #f8fafc, #e2e8f0);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-4px);
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 16px;
        border: 4px solid #38b2ac; // Inner border color
        opacity: 0.6;
        z-index: 1;
    }
`;

const CardContent = styled.div`
    position: relative;
    z-index: 2;
    padding: 16px;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    justify-content: space-between; // Add space between text and delete icon
`;

const DeleteButton = styled(DeleteIcon)`
    cursor: pointer;
    color: #e53e3e; // Red color for delete icon
    transition: color 0.3s ease;

    &:hover {
        color: #c53030; // Darker red on hover
    }
`;

const ExpenseCard = ({ expense, onDelete }) => {
    return (
        <CardContainer className="p-4">
            <CardContent>
                <IconContainer>
                    <Typography variant="h6" className="text-teal-600 font-bold">
                        {expense.description}
                    </Typography>
                    <DeleteButton 
                        onClick={() => onDelete(expense.id)} // Trigger delete onClick
                    />
                </IconContainer>
                <IconContainer>
                    <MoneyOffIcon className="text-teal-500 mr-2" />
                    <Typography variant="body1" className="text-gray-800">
                        <strong>Amount:</strong> ${expense.amount.toFixed(2)}
                    </Typography>
                </IconContainer>
                <IconContainer>
                    <DateRangeIcon className="text-teal-500 mr-2" />
                    <Typography variant="body1" className="text-gray-800">
                        <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}
                    </Typography>
                </IconContainer>
                <IconContainer>
                    <CategoryIcon className="text-teal-500 mr-2" />
                    <Typography variant="body1" className="text-gray-800">
                        <strong>Category:</strong> <span className="text-teal-500">{expense.category.name}</span>
                    </Typography>
                </IconContainer>
                <div className="mt-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        View Details
                    </button>
                </div>
            </CardContent>
        </CardContainer>
    );
};

export default ExpenseCard;
