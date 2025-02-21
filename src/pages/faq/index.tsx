// FAQ.tsx
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
// Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PageHeader from '../../components/pages/page-header';
import { useAdminKvAssetQuery } from '../../graphql/graphql-generated';
import LoadingSpinner from '../../components/common/loading-spinner';
import ErrorAlert from '../../components/common/error-alert';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme/main-theme';

const Faq: React.FC = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expanded, setExpanded] = useState<string | false>(false);

  const { data, loading, error } = useAdminKvAssetQuery({
    variables: {
      input: {
        kv_key: 'FAQ',
      },
    },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error.message} />;
  }

  const faqGroups = data?.adminKvAsset?.kv_value || [];

  // Filter each group based on the search query.
  interface FaqItem {
    question: string;
    answer: string;
  }

  interface FaqGroup {
    heading: string;
    items: FaqItem[];
  }

  const filteredGroups: FaqGroup[] = faqGroups
    .map((group: FaqGroup) => {
      const filteredItems: FaqItem[] = group.items.filter(
        (item: FaqItem) => item.question.toLowerCase().includes(searchQuery.toLowerCase())
        /* enable this line to include answer in search  -> || item.answer.toLowerCase().includes(searchQuery.toLowerCase()) */
      );
      return { ...group, items: filteredItems };
    })
    .filter((group: FaqGroup) => group.items.length > 0);

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader title="FAQ" />
      </Box>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {/* Overall FAQ Heading */}
        <Typography variant="h3" component="h1" gutterBottom>
          How Can We Help You?
        </Typography>

        {/* Search Input */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask a question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              // Default (unfocused) label color
              '& .MuiFormLabel-root': {
                color: colors.grey[50],
              },
              // Label color when focused or hovered
              '& .MuiFormLabel-root.Mui-focused': {
                color: colors.greenAccent[400],
              },
              //input text color:
              '& .MuiOutlinedInput-root': {
                color: colors.grey[50],
              },
              // The border color on hover/focus
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.grey[100],
              },
            }}
          />
        </Box>

        {/* Render FAQ Groups */}
        {filteredGroups.length === 0 ? (
          <Typography variant="body1">No results found.</Typography>
        ) : (
          filteredGroups.map((group, groupIndex) => (
            <Box key={group.heading} sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ paddingBottom: '10px', fontWeight: 'bold' }}>
                {group.heading}
              </Typography>

              {group.items.map((item, index) => {
                const isExpanded = expanded === item.question;

                return (
                  <Accordion
                    key={item.question}
                    expanded={isExpanded}
                    onChange={(_, newExpanded) => setExpanded(newExpanded ? item.question : false)}
                    sx={{ mb: 0 }} // spacing between Accordions
                  >
                    <AccordionSummary
                      // Toggle between plus/minus icon based on expansion
                      expandIcon={isExpanded ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                      aria-controls={`panel-${groupIndex}-${index}-content`}
                      id={`panel-${groupIndex}-${index}-header`}
                      sx={{
                        // Move icon to the left
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        '& .MuiAccordionSummary-content': {
                          marginLeft: 2, // space between icon and text
                        },
                        // Push the icon to the left consistently
                        '& .MuiAccordionSummary-expandIconWrapper': {
                          marginRight: 'auto',
                        },
                      }}
                    >
                      <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
};

export default Faq;
