import React from 'react';
import { Image, Layout, Menu } from 'antd';
import classes from './style.module.less';
import { sidebarMenu } from 'src/constants/sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from 'src/redux/actions/sidebarMenu';

const Sidebar = () => {
	const dispatch = useDispatch();
	//for change view
	const stateMenuSidebar = useSelector((state) => state.setMenu);
	const selectedKey = stateMenuSidebar.selectedKey;
	const handleMenuClick = (e) => {
	  dispatch(setMenu(e.key))
	};

	return (
		<div className={classes.sidebarWrapper}>
			<Layout>
				{/* header sidebar*/}
				<div className={classes.sidebarHeader}>
						<a>
							<div className={classes.logo}>
								<Image src={'/svg/muf_logo.svg'} preview={false}/>
							</div>
						</a>
				</div>
				<Layout.Sider
					className={classes.sidebar}
					theme="light"
					collapsedWidth={0}
					trigger={null}
					width={250}>
						{/* list menu sidebar */}
						<Menu
						mode="inline"
						items={sidebarMenu}
						onClick={handleMenuClick}
						selectedKeys={[selectedKey]}
						/>

						{/* footer sidebar */}
						<div className={classes.sidebarfooter}>
							<p>
								© 2024 MANDIRI UTAMA FINANCE. <br></br>All Right Reserved.
							</p>
						</div>
				</Layout.Sider>
			</Layout>
		</div>
	);
};

export default Sidebar;
