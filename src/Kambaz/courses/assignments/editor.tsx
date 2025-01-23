export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
  
        <label htmlFor="wd-description">Description</label>
        <textarea id="wd-description">
          The assignment is available online. Submit a link to the landing page of the assignment.
        </textarea>
        <br />
  
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="Group 1">Group 1</option>
                <option value="Group 2">Group 2</option>
                <option value="Group 3">Group 3</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="Percentage">Percentage</option>
                <option value="Grade">Grade</option>
                <option value="Points">Points</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="Link">Online</option>
                <option value="File Upload">File Upload</option>
                <option value="Text Entry">Text Entry</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-online-entry-options">Online Entry Options</label>
            </td>
            <td>
                <div>
                    <input type="checkbox" name="online-entry-option" id="wd-chkbox-text-entry" />
                    <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br />

                    <input type="checkbox" name="online-entry-option" id="wd-chkbox-website-url" />
                    <label htmlFor="wd-chkbox-website-url">Website URL</label><br />

                    <input type="checkbox" name="online-entry-option" id="wd-chkbox-media-recordings" />
                    <label htmlFor="wd-chkbox-media-recordings">Media Recordings</label><br />

                    <input type="checkbox" name="online-entry-option" id="wd-chkbox-student-annotation" />
                    <label htmlFor="wd-chkbox-student-annotation">Student Annotation</label><br />

                    <input type="checkbox" name="online-entry-option" id="wd-chkbox-file-uploads" />
                    <label htmlFor="wd-chkbox-file-uploads">File Uploads</label><br />
                </div>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <input id="wd-assign-to" value="All Students" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due Date</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available From</label>
            </td>
            <td>
              <input id="wd-available-from" type="date" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Available Until</label>
            </td>
            <td>
              <input id="wd-available-until" type="date" />
            </td>
          </tr>
        </table>
  
        <div className="wd-buttons">
          <button id="wd-save-button">Save</button>
          <button id="wd-cancel-button">Cancel</button>
        </div>
      </div>
    );
  }
  