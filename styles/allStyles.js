import { StyleSheet } from 'react-native';

/*BODY STYLES*/
const addStyles = StyleSheet.create({
    add: {
        backgroundColor: '',
        alignItems: 'center',
        padding: 2,
    },
  })

const selectedStyles = StyleSheet.create({
  selected: {
    marginBottom: 14,
  },
  text:{
    fontWeight: 'bold',
    color: '#141E46',
  },
});



/*SET DISTANCE/TIME/DAY STYLES*/
const addcontentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },

  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#141E46',
    marginHorizontal: 15,
    width: 90,
    height: 120,
    justifyContent: 'center',
    borderRadius: 10,
  },

  input: {
    height: 'auto',
    width: 90,
    textAlign: 'center',
    color: '#FFF5E0',
  
  },

  text: {
    color: '#FFF5E0',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },

  calendarText: {
    width: 90,
    height: 40,
    color: '#FFF5E0',
    marginTop: 16,
  },
});

/* BUTTON STYLES */
const buttonStyles = StyleSheet.create({

  button: {
    width: 210,
    height: 60,
    borderRadius: 13,
    borderWidth: 1,
    backgroundColor: '#F06543',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },

  buttonText: {
    color: '#141E46',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

/*WORKOUT LIST STYLES*/
const listStyles = StyleSheet.create({
  listContainer:{
    backgroundColor: '#141E46',
    width: 330,
    height: 270,
    borderRadius: 10,
    marginTop: 30,

  },

  list:{
    backgroundColor: '#141E46',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF5E0',
  },

  text:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF5E0',

  },

});

/*SELECT WORKOUT TYPE STYLES*/
const selectWorkoutStyles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    marginTop: 12,
  },
  
  button:{
    backgroundColor:'#141E46',
    flexDirection: 'row',
    padding: 20,
    borderWidth: 1,
    margin: 10,
    width: 120,
  
    justifyContent: 'center',


  },

  text:{
    fontWeight: 'bold',
    color: '#FFF5E0',
    fontSize: 16,
  },

  /*SELECTED BUTTON STYLE*/
  selectedButton: {
    backgroundColor: '#F06543',
    shadowColor: 'black',
  },

  selectedText: {
    color: '#141E46',
    fontWeight: 'bold',
    fontSize: 16,
  },

});

/*TOTAL DISTANCE STYLES*/
const totalDistances = StyleSheet.create({
  total:{
    flexDirection: 'row',
    backgroundColor: '#141E46',
    color: 'white',
    width: 330,
    textAlign: 'center',
    
  },

  text:{
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#141E46',
    marginTop: 10,
    color: '#F06543',
  },
})


/*MODAL STYLES*/
const modalStyles = StyleSheet.create({
  list:{
    padding: 10,
    backgroundColor: '#141E46',
    borderTopWidth: 1,
    borderTopColor: '#FFF5E0',
    width: '100%',

  },

  text:{
    color: '#FFF5E0',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    fontSize: 16,
  },
  
  
  /*MODAL WORKOUT SELECT BUTTONS STYLES*/
  buttonContainer:{
    flexDirection: 'row',
  },


  button:{

    marginHorizontal: 8,
    backgroundColor: '#141E46',
    width: 110,

  },

  buttonText:{
    color: 'white',
    margin: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'
    
  }

})

export {
    addStyles,
    selectedStyles,
    addcontentStyles,
    buttonStyles,
    listStyles,
    selectWorkoutStyles,
    totalDistances,
    modalStyles,
  };