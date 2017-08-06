module Jekyll

    class EmailTag < Liquid::Tag

        def initialize(tag_name, text, tokens)
            super
            @email = text.strip
        end

        def render(context)
            email_link = obfuscate_email_link(@email)
            email_display = obfuscate_email_display(@email)
            "<a class=\"anchor\" href=\"#{email_link}\">#{email_display}</a>"
        end

        private
        def obfuscate_email_link(string)
            string = "mailto:#{string}".chars
            string.map!.with_index { |char, index|
                if char.match(/^[:@.]/i)
                    char = "&#x#{char.ord.to_s(16)};"
                elsif char.match(/^[aeiou]/i) && index > 7
                    char = "%#{char.ord.to_s(16)}"
                else
                    char = "&##{char.ord.to_s};"
                end
            }
            return string.join('')
        end

        private
        def obfuscate_email_display(string)
            string = string.chars
            string.map! { |char|
                if char.match(/^[@.]/i)
                    char = "<i>&#x#{char.ord.to_s(16)};</i>"
                    char += '<!-- @ -->'
                else
                    char = "&##{char.ord.to_s};"
                end
            }
            return string.join('')
        end

    end

end

Liquid::Template.register_tag('email', Jekyll::EmailTag)