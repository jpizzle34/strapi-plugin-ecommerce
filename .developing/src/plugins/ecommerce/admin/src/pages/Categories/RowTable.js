import React, { useState } from 'react'

import Pencil from "@strapi/icons/Pencil";
import Trash from "@strapi/icons/Trash";
import ExclamationMarkCircle from "@strapi/icons/ExclamationMarkCircle";

import { Td } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { Avatar } from "@strapi/design-system/Avatar";
import { Switch } from "@strapi/design-system/Switch";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import { Box } from "@strapi/design-system/Box";
import Edit from "./Edit";
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import { Stack } from "@strapi/design-system/Stack";
import { Button } from "@strapi/design-system/Button";


const RowTable = ({ rowData, tableData, updateRowData, deleteRow }) => {
  const [ published, setPublished ] = useState(rowData.publishedAt)
  const [ isVisible, setIsVisible ] = useState(false)
  const [ isDeleteVisible, setIsDeleteVisible ] = useState(false)

  return (
    <>
      { isVisible &&
        <Edit
          closeHandler = { () => setIsVisible(false) }
          rowData = { rowData }
          tableData = { tableData }
          updateRowData = { (id, data) => updateRowData(id, data) }
        />
      }
      <Dialog onClose={() => setIsDeleteVisible(false)} title="Confirmation" isOpen={isDeleteVisible}>
        <DialogBody icon={<ExclamationMarkCircle />}>
          <Stack size={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">Are you sure you want to delete this?</Typography>
            </Flex>
          </Stack>
        </DialogBody>
        <DialogFooter startAction={<Button onClick={() => setIsDeleteVisible(false)} variant="tertiary">
          Cancel
        </Button>} endAction={<Button onClick={() => deleteRow(rowData.id)} variant="danger-light" startIcon={<Trash />}>
          Confirm
        </Button>} />
      </Dialog>
      <Td><Typography textColor="neutral800">{ rowData.id }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.name }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.parent_category ? rowData.parent_category.name : null }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.type }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.slug }</Typography></Td>
      <Td>
        <Switch label="Published" selected={ !!published } onChange={() => {
          const time = published ? null : Date.now()
          updateRowData(rowData.id, { publishedAt: time })
          setPublished(time)
        }} />
      </Td>
      <Td>
        <Flex>
          <IconButton onClick={ () => setIsVisible(true) } label="Edit" noBorder icon = { <Pencil /> }/>
          <Box paddingLeft={1}>
            <IconButton
              label="Delete"
              noBorder
              icon={ <Trash/> }
              onClick={ () => setIsDeleteVisible(true) }
            />
          </Box>
        </Flex>
      </Td>
    </>
  )
}
export default RowTable