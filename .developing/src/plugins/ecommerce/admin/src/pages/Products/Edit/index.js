import React, { useEffect, useState } from 'react';

import CollectionType from '@strapi/icons/CollectionType';
import validate from '../../../utils/validate';

import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { request  } from '@strapi/helper-plugin';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Typography } from '@strapi/design-system/Typography';
import { Divider } from '@strapi/design-system/Divider';
import { TextInput } from '@strapi/design-system/TextInput';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Option, Select } from '@strapi/design-system/Select';
import { NumberInput } from '@strapi/design-system/NumberInput';
import { Button } from '@strapi/design-system/Button';
import { Textarea } from '@strapi/design-system/Textarea';
import { DatePicker } from '@strapi/design-system/DatePicker';


const statusArr = [ 'SELLING', 'ON_ORDER', 'UNAVAILABLE' ];

const Edit = ({ rowData, closeHandler, updateRowData, allCategories } ) => {
  const [ name, setName ] = useState(rowData.name);
  const [ slug, setSlug ] = useState(rowData.slug);
  const [ sku, setSku ] = useState(rowData.sku);
  const [ icon, setIcon ] = useState(rowData.icon);
  const [ categories, setCategories ] = useState(rowData.categories.map(el => el.id));
  const [ price, setPrice ] = useState(rowData.price || undefined);
  const [ dateAvailable, setDateAvailable ] = useState();
  const [ quantity, setQuantity ] = useState(rowData.quantity || undefined);
  const [ minQuantity, setMinQuantity ] = useState(rowData.min_quantity || undefined);
  const [ status, setStatus ] = useState(rowData.status);
  const [ discount, setDiscount ] = useState(rowData.discount || undefined);
  const [ description, setDescription ] = useState(rowData.description);
  const [ shortDescription, setShortDescription ] = useState(rowData.short_description);
  const [ metaTitle, setMetaTitle ] = useState(rowData.meta_title);
  const [ metaKeywords, setMetaKeywords ] = useState(rowData.meta_keywords);
  const [ metaDescription, setMetaDescription ] = useState(rowData.meta_description);
  const [ errors, setErrors] = useState({});

  const submitButtonHandler = async() => {
    setErrors({});

    let { success, validateErrors } = validate({
      name, sku, slug, price, shortDescription, description, metaTitle, metaKeywords, metaDescription
    }, errors, setErrors);

    if (slug !== rowData.slug) {
      const categoryWithTheSameSlug = await request(`/ecommerce/products/by-slug/${slug}`).catch(() => {});
      if (categoryWithTheSameSlug) {
        success = false;
        setErrors({ ...validateErrors, slug: 'This name is taken'});
      }
    }

    if (success) {
      updateRowData(rowData.id, {
        name, slug, sku, icon, categories, price, dateAvailable, quantity, minQuantity, status, discount,
        description, shortDescription, metaDescription,metaTitle, metaKeywords
      });
      closeHandler();
    } else {
      setErrors(validateErrors);
    }
  }

  return (
    <ModalLayout onClose={ () => closeHandler() } labelledBy="Edit">
      <ModalHeader>
        <Stack horizontal size={2}>
          <CollectionType/>
          <Breadcrumbs label="Category model, name field">
            <Crumb>Products</Crumb>
            <Crumb>{ rowData.name }</Crumb>
          </Breadcrumbs>
        </Stack>
      </ModalHeader>
      <ModalBody>
        <Box paddingTop={4} paddingBottom={3}><Typography variant={'beta'}>Edit {rowData.name}</Typography></Box>
        <Divider/>
        <Box paddingTop={5}>
          <Grid gap={5}>
            <GridItem col={6}>
              <TextInput
                label="Name"
                name="name"
                value={ name }
                onChange={ e => {
                  setName(e.target.value)
                }}
                error={ errors.name }
              />
            </GridItem>
            <GridItem col={6}>
              <TextInput
                name="slug"
                label="Slug"
                value={ slug }
                onChange={ e => setSlug(e.target.value) }
                error={ errors.slug }
              />
            </GridItem>
            <GridItem col={6}>
              <Select
                label={'Category'}
                name='category'
                value={ categories }
                onChange={ setCategories }
                customizeContent={values => `${values.length} currently selected`}
                multi
              >
                { allCategories.map((entry) => <Option value={entry.id} key={entry.id}>{ entry.name }</Option>) }
              </Select>
            </GridItem>
            <GridItem col={3}>
              <TextInput
                name="sku"
                label="SKU"
                value={sku}
                onChange={ e => setSku(e.target.value) }
                error={ errors.sku }
              />
            </GridItem>
            <GridItem col={3}>
              <TextInput
                name="icon"
                label="Icon"
                value={icon}
                onChange={ e => setIcon(e.target.value) }
              />
            </GridItem>
            <GridItem col={6}>
              <Select
                label={'Status'}
                name="status"
                value={ status }
                onChange={ setStatus }
              >
                { statusArr.map((entry, id) => <Option value={entry} key={id}>{ entry }</Option>) }
              </Select>
            </GridItem>
            <GridItem col={3}>
              <NumberInput
                name="price"
                label="Price"
                value={ price }
                onValueChange={ value => setPrice(value) }
                error={ errors.price }
              />
            </GridItem>
            <GridItem col={3}>
              <NumberInput
                name="discount"
                label="Discount %"
                value={ discount }
                onValueChange={ value => setDiscount(value) }
              />
            </GridItem>
            <GridItem col={3}>
              <NumberInput
                name="quantity"
                label="Quantity"
                value={quantity}
                onValueChange={ value => setQuantity(value) }
                />
            </GridItem>
            <GridItem col={3}>
              <NumberInput
                name="minQuantity"
                label="Min_Quantity"
                value={ minQuantity }
                onValueChange={value => setMinQuantity(value)}
              />
            </GridItem>
            <GridItem col={3}>
              <DatePicker
                onChange={ setDateAvailable }
                selectedDate={ dateAvailable }
                label="Date available"
                name="dateAvailable"
                clearLabel={'Clear the datepicker'}
                onClear={ () => setDateAvailable(null) }
                selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`}
              />
            </GridItem>
            <GridItem col={12}>
              <Textarea error={ errors.shortDescription } label="Short description" name="short description" onChange={e => setShortDescription(e.target.value)}>
                { shortDescription }
              </Textarea>
            </GridItem>
            <GridItem col={12}>
              <Textarea error={ errors.description } label="Description" name="description" onChange={e => setDescription(e.target.value)}>
                { description }
              </Textarea>
            </GridItem>
          </Grid>
          <Box paddingTop={5} paddingBottom={3}><Typography variant={'beta'}>SEO</Typography></Box>
          <Grid gap={5}>
            <GridItem col={6}>
              <TextInput
                label="Meta_title"
                name="metaTitle"
                value={ metaTitle }
                onChange={ e => setMetaTitle(e.target.value) }
                error={ errors.metaTitle }
              />
            </GridItem>
            <GridItem col={6}>
              <TextInput
                label="Meta_keywords"
                name="metaKeywords"
                value={ metaKeywords }
                onChange={ e => setMetaKeywords(e.target.value) }
                error={ errors.metaKeywords }
              />
            </GridItem>
            <GridItem col={12}>
              <Textarea error={ errors.metaDescription } label="Meta_description" name="metaDescription" onChange={e => setMetaDescription(e.target.value)}>
                { metaDescription }
              </Textarea>
            </GridItem>
          </Grid>
        </Box>
      </ModalBody>
      <ModalFooter
        startActions = { <Button onClick = { closeHandler } variant="tertiary"> Cancel </Button> }
        endActions = { <Button onClick = { submitButtonHandler }> Finish </Button> }
      />
    </ModalLayout>
  );
};

export default Edit;
