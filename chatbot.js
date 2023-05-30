require('dotenv').config()
const config = require('openai').Configuration
const api = require('openai').OpenAIApi
const key = process.env.openai_api_key
const Resolver = require('./services/resolver')
const openai = new api( new config({
    apiKey: key
}))

const about = `Hello, my name is Alfonso and I m a Full Stack developer from Chicago. I am fluent in both English and Spanish and have been developing for the past 3 years. Over this time, I have completed more than 7 projects, gaining expertise in various programming languages, frameworks, and tools.Front-end skills:
I am proficient in front-end technologies such as HTML, CSS, and JavaScript, and have developed mobile apps using React Native and Node.js. With the help of AI, I have also designed user interfaces for some apps, making use of my creative and analytical skills.

Back-end skills:
I specialize in the backend of the development stack and my favorite programming language is C. However, I am proficient in other programming languages like C++, and JavaScript. I have also worked with frameworks such as React and Node.js with Express.js. I can use Prop Engineering to enhance the efficiency of the backend and I have used this technology to create a personal assistant for myself.

Database skills:
I have experience working with both SQL and NoSQL databases. I am proficient in SQL databases like PostgreSQL, MySQL, and others. Additionally, I have worked with NoSQL databases like MongoDB and Mongoose, gaining expertise in data modeling and database management.

Version control:
I am well-versed in using Git and GitHub for version control, and I have utilized these tools in my projects to maintain version history and track changes.

Deployment skills:
I am experienced in deploying apps to AWS and have deployed applications to EC2 instances, S3, and Amplify. Additionally, I have deployed databases to RDS instances, and I am proficient in the AWS environment.

In summary, I am a Full Stack developer with expertise in front-end and back-end development, database management, version control, and deployment skills. I am always eager to learn and explore new technologies, and I m confident in my ability to contribute meaningfully to any project I work on.`

const contact = ` email:  alfonso25elorriaga@gmail.com
                    phone number: 773 991 7798 `
const context = [
    {role: 'system', content: `You are a friendly AI assistante for my professional software deveopment portfolio. The purpose
    of the portfolio is to help me get a job a as software developer/ engineer/programmer. 
    Or get hired as freelancer for a software development project. Your job is to assit the visitor 
    of my portfolio by greeting them and responding to their questions and comments regarding my 
    professional profile. You can get the information about my professional profile in the "about"
    text delimited by triple medium dashes "--".
    If the user makes a question or commment that is not regarding my professional profile, 
    then respond, in your own words, that you can only awnser questions about my professional 
    profile and do not answer the question. Also  respond why the question is  unrelated to my proffesional profile. 
    This is an example of how to handle this case:
    user: Tell me about the second world war
    assistant: Sorry that question is not related to Alfonso professional profile. 
    If the question is related to my professional profile answer it but do not mention 
    why is related to my professional profile.
    This is an example of how to handke this case:
    user: can he program in c++?
    assistant: Yes, Alfonso has work in multiple projects using  c++.
    If the user wants to contact me to set up an interview or to get to know me better or to talk
    to me directly or leave a message or something similar, offer 2 options: 
    1. give them my contact info, use the info in the "contact" delimited by slashes. 
    2. offer to take their message so you will contact me on behalf of the user. Ask for his/her info
    such as phone number, email, name company and subject. Tell the user that I will get back at him/her
    as soon as I can. 
    This is an example of how to handke this case:
    user: I would like to interview him
    assistant: Great I can take you details such as number, name or email and and let Alfonso 
    know that you are intersted on an interview. Or this I can give you his contact details 
    and you can contact him yourself.
  
    Always thank the user for visiting my portfolio and for his/her interest. 
    Restrict your answer to no more than 150 characters
    about: ---${about}---.
    contact: ///${contact}/// `}
]
const getCompletionFromMessages=async (context)=>{
  
    const response = await openai.createChatCompletion({
        model : "gpt-3.5-turbo",
        messages : context
      })
      if (response.data.choices.length > 0 && response.data.choices[0].message && response.data.choices[0].message.content){
        return response.data.choices[0].message.content
      }
      else{
        throw new Error('could_get_completion')
      }
}
module.exports = {
  
  
  collectMessages : async (req, res)=>{
    const resolver = Resolver(res)
    console.log(req.body.message)
    try {
       const prompt = req.body.message
       context.push({role : 'user', content: prompt})
       const response = await getCompletionFromMessages(context)
       context.push({role : 'assistant', content : response})
       console.log(response)
       return resolver.success(response, 'messages_collected')
  } catch (error) {
       console.log(error)
       return resolver.internalServerError(error, error.message)
  }
   
  }
}