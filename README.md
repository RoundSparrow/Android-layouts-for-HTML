=== Android layout for HTML ===
Contributors : Ronald Coarite
Location : La Paz Bolivia

A pluying html to design view using the views of android . maintaining similarity
in design and code syntax .


=== Description ===

Plugin jquery and html tags to design views using android layout and widget
( FrameLayout , LinearLayout , RelativeLayout , TextView , etc. ..) .
Inclue dynamic creation of view ( android ) to container .

=== What are android layout ===

Android offers a range of views that allow a very easy
make your screens using the model view controller .

* For more details see the sights of android .
http://developer.android.com/guide/topics/ui/declaring-layout.html
* An example sensillo for html output:
    <body>
        < FrameLayout
            layout_width = " match_parent "
            layout_height = " match_parent "
            background = " black"
            id = " FRA1 ">
            < TextView
                id = " txtOtroasda "
                layout_width = " wrap_content "
                layout_height = " wrap_content "
                background = " yellow"
                text = "Hello world"
                layout_gravity = "center ">
            < / TextView >
        </ FrameLayout >
    < / body>

=== Views  How to use html android ===

It is very simple to create views html .
Import the libraries and you can disiñar necesaras their screens

=== Installation ===

1. - Download the example in git hub to get the necessary libraries
Two . - Add the libraries at the top of the page
Three . - Create your view on your page html

=== Usage ===

* Include the jquery.js in you html
* Include the jquery.layout.js in you html

example
<html>
    <head>
        Layout <title> android in html < / title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="style/gral_style.css">
        Add your business src="script/jquery.js"> < / script>
        Add your business src="script/layout.js"> < / script>
    < / head>
    <body>
        < FrameLayout
            layout_width = " match_parent "
            layout_height = " match_parent "
            background = " black"
            id = " FRA1 ">
            < TextView
                id = " txtName "
                layout_width = " wrap_content "
                layout_height = " wrap_content "
                background = "blue "
                text = " Ronald coarite mamani "
                layout_gravity = "left | bottom" >
            < / TextView >
            < TextView
                id = " txtOtroasda "
                layout_width = " wrap_content "
                layout_height = " wrap_content "
                background = " yellow"
                text = " Hello"
                layout_gravity = "center ">
            < / TextView >
        </ FrameLayout >
    < / body>
< / html >

Known Issues == ==

* Unfortunately not yet have a viewer for views. But it can be run directly in your browser and see
results .

As a recommendation can use the browser to view debug errors that may encounter when
design their views
