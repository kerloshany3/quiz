import request, { gql } from "graphql-request"

const MASTER_URL = "https://ap-south-1.cdn.hygraph.com/content/cm5gvtuid03st08o0hz1fdxtm/master"
const MASTER_URL_QUIZ = "https://ap-south-1.cdn.hygraph.com/content/cm5l2g44u00k407w74jiusgtu/master"


const EnrollmentUsers = async (userEmail) => {
  const query4 = gql`
  query MyQuery {
  userEnrolls(where: {userEmail: "`+ userEmail + `", isHePaid: true}) {
    isHePaid
    phonenumber
    id
    
    userEmail
    
  }
}
  `



  const result4 = await request(MASTER_URL, query4)
  return result4;
}

const getQuizDataWithEnroll = async (userEmail) => {

  const query5 = gql`
  
  query MyQuery {
  userEnrolls(where: {userEmail: "kerlos778@gmail.com"}) {
    id
    isHePaid
  }
}
  
  `
  const result5 = await request(MASTER_URL, query5)
  return result5

}

const SaveGradesOfQuiz = async (subname, bookname , userEmail, uerName, userGrade, quizname, numofqus ) => {
  const query6 = gql`
  
  mutation MyMutation {
  createQuizresult(
    data: { nameofsub: `+ subname + `, nameofBook: ` + bookname + `, userEmail: "` + userEmail + `", userName: "` + uerName + `", quizGrade: ` + userGrade + `,nameofquiz: "` + quizname + `",numofqus:` + numofqus + `}
  ) {
    id
  }

  
  
  publishManyQuizresultsConnection (first: 10000) {
    edges {
      node {
        id
      }
    }
  }
}
  `

  const reslut6 = await request(MASTER_URL_QUIZ, query6)
  return reslut6
}

const vquiz = async (userEmail) => {
  const qmon = gql`
  
  
query MyQuery {
  quizresults(where: {userEmail: "`+ userEmail + `"}, last: 20) {
    id
    quizGrade
    userName
    nameofquiz
    numofqus
     nameofsub
    nameofBook
  }
}

  `

  const quizres = await request(MASTER_URL, qmon)
  return quizres;
}

const data4admin = async () => {
  const dataa4admin = gql`
  
  query MyQuery {
  userEnrolls {
    userEmail
    courseid
    course {
      price
      updatedAt
    }
    isHePaid
    id
  }
}
  `

  const admindata = await request(MASTER_URL, dataa4admin)
  return admindata
}

const editStateSub = async (idofEnroll, ActiveOrDeactive) => {
  const query9 = gql`
  mutation MyMutation {
  updateUserEnroll(
    data: {isHePaid: `+ ActiveOrDeactive + `}
    where: {id: "`+ idofEnroll + `"}
  ) {
    id
  }
}
  

`

  const state4 = await request(MASTER_URL, query9)
  return state4;


}

const publishEnrolls = async () => {
  const wie = gql`
   mutation MyMutation {
  publishManyUserEnrollsConnection {
    edges {
      node {
        id
      }
    }
  }
}
    `

  const back = await request(MASTER_URL, wie)
  return back
}


const dataofChem = async (quizid) => {
  const shite = gql`
  
  query MyQuery {
  quiz(where: {id: "`+ quizid + `"}) {
        quiztitle
        question {
          opationA
          opationC
          opationB
          opationD
          trueChoisevip
          qus
        }

         chooseBook
         subjectName
    
      }
}

  `

  const shitosd = await request(MASTER_URL, shite)
  return shitosd
}

const subchem = async (sub) => {
  const shite = gql`
  query MyQuery {
  quizzes(where: {subjectName: `+ sub + `}) {
    quiztitle
    id
    chooseBook
  }
}
  `

  const shitosd = await request(MASTER_URL, shite)
  return shitosd
}


const sendEnrollData = async ( userEmail, phonenumber) => {
  const query3 = gql`
  
  mutation MyMutation {

   createUserEnroll(
    data: {phonenumber: "`+phonenumber+`", isHePaid: false, userEmail: "`+userEmail+`"}
  ) {
    id
    userEmail
  }

 
     publishManyUserEnrollsConnection(where: {}) {
    edges {
      node {
        id
      }
    }
  }
}
  
  `


  const result3 = await request(MASTER_URL, query3)
  return result3
}

const premUsers = async (useremail) => {
  const query3 = gql`
  query MyQuery {
  userEnrolls(where: {isHePaid: true, userEmail: "`+useremail+`"}) {
    id
    userEmail
    isHePaid
  }
}
  `


  const result3 = await request(MASTER_URL, query3)
  return result3
}




export default {

  premUsers,
  EnrollmentUsers,
  getQuizDataWithEnroll,
  SaveGradesOfQuiz,
  vquiz,
  data4admin,
  editStateSub,
  publishEnrolls,
  sendEnrollData,
  dataofChem,
  subchem


}