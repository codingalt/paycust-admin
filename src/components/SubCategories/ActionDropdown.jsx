import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import css from "./SubCategories.module.scss";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const ActionDropdown = ({item}) => {
    const navigate = useNavigate();
    const iconClasses =
      "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown placement="bottom-end" backdrop="blur">
      <DropdownTrigger>
        <div className={css.menuIcon}>
          <HiDotsVertical />
        </div>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownItem
          key="edit"
          onClick={() => navigate(`/admin/store/edit/subGlobalCategory/${item.id}`)}
          showDivider
          description="Allows you to edit the item"
          startContent={<MdEditSquare className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the item"
          startContent={
            <AiFillDelete className={cn(iconClasses, "text-danger")} />
          }
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ActionDropdown