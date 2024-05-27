import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    readDatabase(process.argv[2] || './database.csv')
      .then((studentsData) => {
        const csList = studentsData.CS.join(', ');
        const sweList = studentsData.SWE.join(', ');

        const resText = 'This is the list of our students\n'
        + `Number of students in CS: ${studentsData.CS.length}. List: ${csList}\n`
        + `Number of students in SWE: ${studentsData.SWE.length}. List: ${sweList}`;

        res.status(200).send(resText);
      })
      .catch((error) => {
        console.error('Error processing students data:', error);
        res.status(500).send('Cannot load the database');
      });
  }

  static async getAllStudentsByMajor(request, res) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const studentsData = await readDatabase(process.argv[2] || './database.csv');
      const majorStudents = studentsData[major] || [];
      const resText = `List: ${majorStudents.join(', ')}`;

      res.status(200).send(resText);
    } catch (error) {
      console.error('Error processing students data:', error);
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
