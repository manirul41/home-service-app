import { request, gql } from 'graphql-request'

const MASTER_URL = 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clty45mh70a2407ukygtli1tx/master'

const getSlider=async() =>{
    const query = gql`
    query GetSlider {
        sliders {
          name
          image {
            url
          }
          id
        }
      }
    `
    const result = await request(MASTER_URL, query)
    return result;
}
const getCategory=async() =>{
    const query = gql`
    query GetCategory {
      categories {
        id
        name
        icon {
          url
        }
      }
    }
    `
    const result = await request(MASTER_URL, query)
    return result;
}

const getBusinessList=async() =>{
    const query = gql`
    query getBusinessList {
      businessLists {
        id
        email
        name
        about
        address
        contactPerson
        category {
          name
        }
        images {
          url
        }
      }
    }
    `
    const result = await request(MASTER_URL, query)
    return result;
}

const getBusinessListByCategory=async(category) =>{
    const query = gql`
    query getBusinessList {
      businessLists(where: {category: {name: "`+category+`"}}) {
        id
        email
        name
        about
        address
        contactPerson
        category {
          name
        }
        images {
          url
        }
      }
    }
    `
    const result = await request(MASTER_URL, query)
    return result;
}

export default {
    getSlider,
    getCategory,
    getBusinessList,
    getBusinessListByCategory,
}
