import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import moment from 'moment'

import UserTable from '../components/Dashboard/UserTable';
import UserTableDetail from '../components/Dashboard/UserTableDetail';
import { UsersAction, ReceiptAction } from '../store/Actions';

const Dash = (props) => {
	let receiptMonths = {
		jan: 0,
		feb: 0,
		march: 0,
		april: 0,
		may: 0,
		june: 0,
		july: 0,
		aug: 0,
		sep: 0,
		oct: 0,
		nov: 0,
		dec: 0
	};
	let userMonths = new Array(12).fill(0)
	const label = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const [barDataReceipts, setBarDataReceipts] = useState({
		labels: label,
		datasets: []
	});

	const [barDataUser, setBarDataUser] = useState({
		labels: label,
		datasets: []
	});
	// useSelector(state => state.dashboardReducer.user)  , useSelector(state => state.dashboardReducer.receipt)
	const users =  []
	const receipts = []
	const dispatch = useDispatch()
	useEffect(() => {
		didMount();
	}, []);

	useEffect(() => {
		setUser();
	}, [users]);

	useEffect(() => {
		willRrecipeProps();
	}, [receipts]);

	const didMount = () => {
		dispatch(ReceiptAction.getRecipts());
		dispatch(UsersAction.getUsers());
	};


	const setUser = () => {
		if (Array.isArray(users) && users.length) {
			users.forEach((user) => {
				const timeObject = moment(user.createdAt).toObject()
				const month = Number(timeObject.months)
				userMonths[month] = userMonths[month] + 1
			});
			setBarDataUser({
				datasets: [
					{
						label: 'User',
						backgroundColor: 'rgba(75,192,192,1)',
						borderColor: 'rgba(0,0,0,1)',
						borderWidth: 2,
						data: userMonths
					}
				]
			});
		}
	}
	const willRrecipeProps = () => {


		if (Array.isArray(receipts) && receipts.length) {
			receipts.map((receipt, index) => {
				if (receipt.month == 'January' || receipt.month == 'January') {
					receiptMonths.jan++;
				} else if (receipt.month === 'Feb' || receipt.month == 'February') {
					receiptMonths.feb++;
				} else if (receipt.month === 'march' || receipt.month === 'March') {
					receiptMonths.march++;
				} else if (receipt.month === 'April' || receipt.month === 'april') {
					receiptMonths.april++;
				} else if (receipt.month === 'May' || receipt.month === 'may') {
					receiptMonths.may++;
				} else if (receipt.month === 'june' || receipt.month === 'June') {
					receiptMonths.june++;
				} else if (receipt.month === 'July' || receipt.month === 'July') {
					receiptMonths.july++;
				} else if (receipt.month === 'August' || receipt.month === 'august') {
					receiptMonths.aug++;
				} else if (receipt.month === 'Sep' || receipt.month === 'Semptember') {
					receiptMonths.sep++;
				} else if (receipt.month === 'oct' || receipt.month === 'October') {
					receiptMonths.oct++;
				} else if (receipt.month === 'nov' || receipt.month === 'November') {
					receiptMonths.nov++;
				} else if (receipt.month === 'dec' || receipt.month === 'December') {
					receiptMonths.dec++;
				}
			});
			setBarDataReceipts({
				datasets: [
					{
						label: 'Recipt',
						backgroundColor: 'rgba(75,192,192,1)',
						borderColor: 'rgba(0,0,0,1)',
						borderWidth: 2,
						data: Object.values(receiptMonths)
					}
				]
			});
		}
	};


	const graph = () => {
		return (
			<div>
				<Bar
					data={barDataReceipts}
					options={{
						title: {
							display: true,
							text: 'RECEIPT GRAPH',
							fontSize: 20
						},
						legend: {
							display: true,
							position: 'right'
						}
					}}
				/>
				<Bar
					data={barDataUser}
					options={{
						title: {
							display: true,
							text: 'USER GRAPH',
							fontSize: 20
						},
						legend: {
							display: true,
							position: 'right'
						}
					}}
				/>
			</div>
		);
	};
	return (
		<div>

			<div className="container">
				{graph()}
			</div>
		</div>
	);
}
export default Dash;

function UserDetail() {
	const { userId } = useParams();

	const [userDetail, setUserDetail] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		let url = process.env.REACT_APP_DASHBOARDAPI;

		fetch(url + userId)
			.then((response) => response.json())
			.then((response) => {
				setUserDetail([response]);
				setIsLoading(false);
			});
	}, []);

	return (
		<div className="container">
			<Table striped bordered hover>
				<UserTable />

				{isLoading ? (
					<h1>Loading...</h1>
				) : (
						<UserTableDetail userData={userDetail} />
					)}
			</Table>
		</div>

	);
}
export { UserDetail }