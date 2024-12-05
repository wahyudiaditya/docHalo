const fs = require('fs')
const bcrypt = require('bcrypt');

let user = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8')).map(async el => {
    const saltRounds = 8;
    const myPlaintextPassword = el.password;

    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds)
    console.log(hash)

    return {
        username: el.username,
        email: el.email,
        role: el.role,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
})

    < div class="d-flex justify-content-center align-items-center" >


<form method="post" action="/user/<%= userProfile.id %>/profiles/edit">

    <div class="row pt-3">
        <!-- Form Input Title -->
        <div class="form-group col-6">
            <label for="inputTitle">First Name</label>
            <input type="text" class="form-control" name="firstName"
                value="<%= userProfile.firstName %>">
        </div>
        <!-- Form Input Title -->

        <!-- Form Input Title -->
        <div class="form-group col-6">
            <label for="inputTitle">Last Name</label>
            <input type="text" class="form-control" name="lastName"
                value="<%= userProfile.lastName %>">
        </div>
        <!-- Form Input Title -->
    </div>

    <!-- Form Difficulty-->
    <div class=" form-group pt-3">
        <label>Gender</label>
        <select name="gender" class="form-select">
            <% const listGender=["Female", "Male" ] %>
                <% listGender.forEach(el=>{ %>
                    <option <%=el===userProfile.gender ? 'selected' :'' %> value="
                        <%= el %>">
                            <%= el %>
                    </option>
                    <% }) %>
        </select>
    </div>
    <!--Form Difficulty--

    < --Form Image URL-- >
    <div class="form-group pt-3">
        <label for="inputImgUrl">Address</label>
        <input type="text" class="form-control" name="address"
            value="<%= userProfile.address %>">
    </div>
    <!--Form Image URL-- >

    < !--Form Image URL-- >
    <div class="form-group pt-3">
        <label>Phone Number</label>
        <input type="text" class="form-control" name="phoneNumber"
            value="<%= userProfile.phoneNumber %>">
    </div>
    <!--Form Image URL-- >

    < !--Form Date-- >
    <div class="row pt-3">
        <div class="form-group col-4">
            <label for="date">Born Date</label>
            <input type="date" class="form-control" name="bornDate"
                value="<%= userProfile.formatBornDate() %>" required>
        </div>
    </div>
    <!--Form Date-- >

    < !--Button Submit-- >
    <div class="pt-3">
        <input type="submit" class="btn btn-sm btn-dark" value="Submit">
    </div>
    <!--Button Submit-- >

</form >
</div >