import React from 'react';
import {clrs} from "../../../constants/colors";
import HeaderPlatform from "../../../components/HeaderPlatform/HeaderPlatform";
import Block from "../../../components/UI/Block/Block";
import Text from "../../../components/UI/Text/Text";
import TabBlock from "../../../components/UI/TabBlock/TabBlock";
import TabItem from "../../../components/UI/TabBlock/TabItem";
import BlockLoading from "../../../components/LoadingComponents/BlockLoading";
import AdminUsersList from "./Components/AdminUsersList";
import AdminUserCreate from "./Components/AdminUserCreate";
import {lan} from "../../../constants/lan";

const AdminUsers = () => {
    return (
        <div style={{backgroundColor: clrs.whiter, width: "100%", minHeight: "100vh"}}>
            <HeaderPlatform/>
            <Block style={{marginTop: "50px"}}>
                <Text style={{textTransform: "uppercase", fontSize: "1rem"}}>{lan.users}</Text>
                <TabBlock headers={["Users", "Create user"]}>
                    <TabItem item={0}>
                        <AdminUsersList/>
                    </TabItem>
                    <TabItem item={1}>
                        <BlockLoading/>
                        <Block style={{padding: 0}}>
                            <AdminUserCreate/>
                        </Block>
                    </TabItem>
                </TabBlock>
            </Block>
        </div>
    );
};

export default AdminUsers;