import React from 'react';
import {clrs} from "../../../constants/colors";
import FlexBlock from "../../../components/UI/FlexBlock/FlexBlock";
import Text from "../../../components/UI/Text/Text";
import Icon from "../../../components/UI/Icon/Icon";
import fileAdd from "../../../images/file-add.svg";
import file from "../../../images/paper-file-text.svg";
import trash from "../../../images/trash.svg";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {removeSectionByIdFromCourseById} from "../../../store/slices/course/courseSlice";
import SectionFile from "./SectionFile";
import {lan} from "../../../constants/lan";

const CourseViewSection = ({section, setModal2, setSelectedSection, isCertificate}) => {

    const dispatch = useDispatch();

    const {id} = useParams();

    async function handleDeleteSection() {
        await dispatch(removeSectionByIdFromCourseById({id: id, sectionId: section.id}));
    }

    if (section === null) {
        return '';
    }

    return (
        <FlexBlock style={{
            border: `1px solid ${clrs.whiter2}`,
            borderRadius: "10px",
            flexDirection: "column",
            gap: "0px",
            overflow: "hidden",
        }}>
            <FlexBlock style={{
                backgroundColor: clrs.skin,
                flexWrap: "wrap",
                padding: "15px",
                width: "calc(100% - 30px)",
                justifyContent: "flex-start"
            }}>
                {!isCertificate && <Icon onClick={handleDeleteSection} style={{cursor: "pointer"}} src={trash}/>}
                <Text default>{isCertificate ? lan.certificate : section.name}</Text>
                <Icon onClick={() => {
                    setModal2(true);
                    setSelectedSection(section);
                }} style={{cursor: "pointer"}} src={fileAdd}/>

            </FlexBlock>
            {
                section?.files?.map((file,i) => {
                    return (
                        <SectionFile key={file.id} file={file} section={section}/>
                    )
                })
            }
        </FlexBlock>
    );
};

export default CourseViewSection;